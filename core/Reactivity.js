function callable(fn, ...args) {
  if (typeof fn !== "function") {
    return fn;
  }
  if (typeof fn === "function") {
    return fn(args);
  }
}

const Reactivity = (function () {
  const options = {
    states: [],
    rootElement: null,
    root: null,
    curInd: 0,
  };
  const dependencyState = [];

  const useState = (init) => {
    const { states, curInd } = options;
    if (states.length === curInd) {
      states.push(init);
    }
    const state = states[curInd];
    const setState = (val) => {
      states[curInd] = val;
      _render();
    };
    options.curInd++;
    return [state, setState];
  };

  const useEffect = (func, dependency) => {
    if (dependency === undefined || dependency.length === 0) {
      return func();
    }
    dependency.forEach((depend) => {
      if (dependencyState[depend]) {
      }
    });
  };

  const _render = () => {
    const { root, rootElement } = options;
    if (root === null || rootElement === null) {
      return;
    }
    options.rootElement();
  };

  const render = (root, components) => {
    options.root = root;
    options.rootElement = components;
    options.curInd = 0;
    _render();
  };
  return { useState, useEffect, render };
})();

let val = 30;
let val2 = 40;

const test = () => {
  const [state, setState] = Reactivity.useState(10);
  const [count, setCount] = Reactivity.useState(20);
  setState((prev) => {
    console.log(+prev + 10);
    return prev + 10;
  });
};

Reactivity.render("", test);
