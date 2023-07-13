function f1() {
  console.log(1);
}

function f2() {
  console.log(2);
}

// 让 f1 的 this 指向 f2，并且让 f1 执行
f1.call(f2); // 1

// 如果多个 call，会让 call 方法执行，并把 call 中的 this 指向改变成 fn2
f1.call.call.call(f2);
