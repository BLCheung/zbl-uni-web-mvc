export default class InstanceKit {
  
  constructor() {
    if (typeof InstanceKit._instance === 'object') {
      return InstanceKit._instance;
    }
    InstanceKit._instance = this;
    return this;
  }
  
  setData(key, value) {
    this[key] = value;
  }
  
  getData(key) {
    if (!this[key]) {
      return null;
    }
    let result = this[key];
    this[key] = null;
    return result;
  }
}
