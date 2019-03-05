(function() {
  // 数组实例的创建
  var arr1 = [];
  var arr2 = new Array(); //创建一个空数组 []
  var arr3 = new Array(5); //创建一个length为5的数组 [ <5 empty items> ]               ([undefined, undefined, undefined, undefined, undefined])
  var arr4 = new Array(1, 2, 3, 4, 5); //创建数组并赋值 [1,2,3,4,5]

  var arr5 = Array.of(7); // 创建数组并赋值 [7]
  var arr6 = Array.of(1, 2, 3); // 创建数组并赋值 [1, 2, 3]

  var arr7 = Array.from(arr6); // 从一个类数组或可迭代对象中创建一个新的数组 [1, 2, 3]

  console.log(arr1, arr2, arr3, arr4, arr5, arr6, arr7);

  //判断一个对象是不是数组
  var arr = [];
  console.log(arr instanceof Array); // 方法一
  console.log(Object.prototype.toString.call(arr) == "[object Array]"); // 方法二
  console.log(Array.isArray(arr)); //方法三
  console.log(arr.constructor == Array); // 方法四
})();

console.log("//////////////////////////////");



// Warn if overriding existing method
if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  );
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function(array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length !== array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] !== array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });


//数组对象的深拷贝
function deepCopy(arr) {
  let result;
  arr instanceof Array ? (result = []) : (result = {});
  for (const key in arr) {
    if (arr.hasOwnProperty(key)) {
      const element = arr[key];
      result[key] = typeof element === "object" ? deepCopy(element) : element;
    }
  }
  return result;
}

let arr2 = [...arr1];
let arr3 = deepCopy(arr1);

