
// export { default as Ajax } from "./net/ajax";
export { default as Cookies } from "./net/cookies";
export { default as Axios } from "./net/_axios";



// namespace AJAX {



// // copy from jquery.js
// var r20 = /%20/g,
//   rbracket = /\[\]$/;


// function customParam(a) {
//     var s : Array<any> = [],
//       add = function(key: string, value : any) : void {
//         // If value is a function, invoke it and return its value
//         value = typeof value === "function" ? value() : value;
//         s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
//       };

//     // If an array was passed in, assume that it is an array of form elements.
//     if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
//       // Serialize the form elements
//       jQuery.each(a, function() {
//         add(this.name, this.value);
//       });
//     } else {
//       for (var prefix in a) {
//         buildParams(prefix, a[prefix], add);
//       }
//     }

//     // Return the resulting serialization
//     return s
//       .join("&")
//       .replace(r20, "+")
//       .replace(/%5B%5D/g, "");
//   }


// /* private method*/
// function buildParams(prefix, obj, add) {
//   if (jQuery.isArray(obj)) {
//     // Serialize array item.
//     jQuery.each(obj, function(i, v) {
//       if (rbracket.test(prefix)) {
//         // Treat each array item as a scalar.
//         add(prefix, v);
//       } else {
//         buildParams(
//           prefix +
//             "[" +
//             (typeof v === "object" || jQuery.isArray(v) ? i : "") +
//             "]",
//           v,
//           add
//         );
//       }
//     });
//   } else if (obj != null && typeof obj === "object") {
//     // Serialize object item.
//     for (var name in obj) {
//       buildParams(prefix + "." + name, obj[name], add);
//     }
//   } else {
//     // Serialize scalar item.
//     add(prefix, obj);
//   }
// }





// export const ajax = async (settings : object, na : number = NA_DEFAULT) : Promise<any> => {



//   let _ = settings;
//   if (na | NA_DEFAULT) {
//       _.data = customParam(_.data);
//       Object.assign(_, ajax.default);
//   }
//   if (na | NA_NONE) {
//     return _ajax(_);
//   }

//   return _ajax(_);
// }



// }

