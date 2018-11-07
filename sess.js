import { createLogger } from "browser-bunyan";

const SESSDB = "sess";
const SESSOBJSTORE = "users";


/**
 * @function {function name}
 * @param  {type}  {description}
 * @return {type} {description}
 */
class sess {
    constructor(req) {

        // set default handler of event
        req.onblocked = sess.sessblocked;
        req.onupgradeneeded = sess.sessupgrade;
        req.onerror = sess.sesserror;
        this.open_req = req;
    }
    static logger() {
        if (!sess._logger) {
            sess._logger = createLogger({ name: "sess" });
        }
        return sess._logger;
    }
    /**
     * @function {function name}
     * @param  {function} handler  callback if open sessdb successfully
     * @param  {function} success  transaction event
     * @param  {function} error    transaction event
     * @param  {function} complete transaction event
     * @param  {type} mod      {description}
     * @return {type} {description}
     */
    sessaction(
        handler = null, 
        [complete, error, abort] = [sess._txcomplete, sess._txerror, sess._txabort], 
        mod = "readwrite") {

        this.open_req.onsuccess = (e) => {
            sess.logger().info("start transaction for session, current version: %d", e.target.result.version);       
            let tx = e.target.result.transaction([SESSOBJSTORE], mod);
            tx.oncomplete = complete;
            tx.onerror = error;
            tx.onabort = abort;
            let idb_objectstore = tx.objectStore(SESSOBJSTORE);
            handler && handler(idb_objectstore);
        };

    }

    static sessblocked() {
        sess.logger().warn("open the session DB in blocked!");
    }

    static sesserror(e) {
        sess.logger().error("open the session DB has occured error!");
    }

    static sessupgrade(e) {
        // this.logger.info("session DB version change to %d", e.target.result.version);
        sess.logger().info("start upgrade session DB, current version %d", e.oldVersion);
    
        let db = e.target.result,
            object_store;
        
        if (e.oldVersion < 1) { /* create db */
            object_store = db.createObjectStore(SESSOBJSTORE, { keyPath: "user_id" });
            sess.logger().info("created session DB successfully.");  
        }
    }


    /* transaction abort */
    static _txabort(e) {
        sess.logger().info("transaction for session DB is aborted!");
    }

    /* transaction complete */
    static _txcomplete(e) {
        sess.logger().info("transaction for session DB is completed!");
    }

    /* transaction error */
    static _txerror(e) {
        sess.logger().error("transaction for session DB has occurred error!");
    }

}


/**
 * @function sessopen
 * @param  {number} ver {version of session db}
 * @return {object} {request}
 */
export function sessopen(ver) {
    let open_request;
    if (ver) {
        open_request = indexedDB.open(SESSDB, ver);
    } else {
        open_request = indexedDB.open(SESSDB);
    }

    let _sess = new sess(open_request);

    return _sess;
}

