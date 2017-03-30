/**
* Debounce active update of table data
*
* @param  {func}   func - heavy function to stall
* @param  {int}    wait - interval to call func
* @param  {bool}   immediate - run now
* @return {func}
*/
export function debounce(func, wait, immediate) {
  // init
  let timeout;
  // return closure so timeouts survive
  // only to cancel them
  return function debouncer(...args) {
    const context = this;
    function later() {
      // reset timeout
      timeout = null;
      // run func
      if (!immediate) func.apply(context, args);
    }
    const callNow = immediate && !timeout;
    // clear previous timer from closure
    // and start over
    clearTimeout(timeout);
    // start new wait tick
    timeout = setTimeout(later, wait);
    // call func now
    if (callNow) func.apply(context, args);
  };
}
