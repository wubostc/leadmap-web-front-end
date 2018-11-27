import { Poster, ArgPostModel, EventPostModel } from './CrossServicePoster.jsx';
import { store } from '../public/js/store.jsx';

const g = new Map();

export class map_manager {
  constructor(key) {
    this._on_resize = this._on_resize.bind(this);
    this._on_message = this._on_message.bind(this);
    this.target_node = null;
    this.origin_node = null;
    this.queue_tasks = [];
    this.obj = null;
    this.key = key;
    window.addEventListener('message', this._on_message, false);
  }

  static getInstance(key) {
    if (!g.has(key)) {
      g.set(key, new map_manager(key));
    }
    return g.get(key);
  }

  move() {

    if (!this.isLoaded) {
      this.queue_tasks.push(() => this.move())
      return this;
    }
    
    const rect = this.target_node.getBoundingClientRect();

    store.dispatch({
      type: this.action_type,
      ltype: 'MOVE',
      key: this.key,
      obj: this.obj,
      rect
    })

    return this;
  }

  _on_resize(e) {
    this.move();
  }

  hide() {
    if (!this.isLoaded) {
      this.queue_tasks.push(() => this.hide());
      return this;
    }
    store.dispatch({
      type: this.action_type,
      ltype: 'HIDE',
      key: this.key,
      obj: this.obj,
    })
    return this;
  }

  show() {
    if (!this.isLoaded) {
      this.queue_tasks.push(() => this.show());
      return this;
    }
    store.dispatch({
      type: this.action_type,
      ltype: 'SHOW',
      key: this.key,
      obj: this.obj,
    })

    return this;
  }

  set_target_node(target/*DOM*/) {
    if (this.target_node === target) return this;
    if (!this.target_node) {
      window.addEventListener("resize", this._on_resize, false);
    }
    
    this.target_node = target;
    return this;
  }

  set_origin_node(obj/*ANY TYPE*/, map_container/*DOM*/, iframe/*DOM*/, action_type, onload) {

    if (this.origin_node) return this;

    this.obj = obj;
    this.origin_node = map_container;
    this.iframe = iframe;
    this.action_type = action_type;
    this.isLoaded = false;
    const _this = this;

    iframe.addEventListener("load", (e) => {
      _this.isLoaded = true;
      
      let task;
      while(task = _this.queue_tasks.shift()) {
        task();
      }

      if (onload) onload();
    }, true);

    return this;
  }


  action(delay/*ms*/, action, paras, completed) {
    if (!this.isLoaded) {
      this.queue_tasks.push(() => this.action(delay, action, paras, completed))
      return this;
    }

    setTimeout(() => {
      return this.MapAction(action, paras, completed);
    }, delay)
    return this;
  }

  MapAction (action, paras, completed) {
    const frame = this.iframe.contentWindow;
    this.completed = completed;
    
    if (completed) {
      let ncompleted =  new Function("", '{try{var rpara=[];for(var i=0;i<arguments.length;i++){rpara.push(arguments[i]);} var result=new ArgPostModel(\'CommMapAction.MapActionCompleted\',rpara);var resultstr=Poster.stringifyModel(result);window.parent.postMessage(resultstr,"*");}catch(e){}}')
      var listner = new EventPostModel("CommMapAction.MapActionCompleted", ncompleted);
      var strListnerEvent = Poster.stringifyModel(listner);
      frame.postMessage(strListnerEvent, '*');
    }

    var beginAction = new ArgPostModel(action, paras && paras.length && paras.length >= 0 ? paras : [paras]);
    var str = Poster.stringifyModel(beginAction);
    frame.postMessage(str, '*');

    return this;
  }

  _on_message(e) {
    if (e.constructor === String) {
      var pm = Poster.parsePostModel(e.data);
      if (this.completed) {
        this.completed(...pm._paras);
      }
      // pm.Excute();
    }
  }

}

