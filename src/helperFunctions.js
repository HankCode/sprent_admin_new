export function createInputState(formData, setFormData) {
  /*
    Returns an object that can be used to spread ...state("name") in an input component.
    For example <input {...state("name")} />
  */
  if(typeof formData != "object") throw new Error("Assumed formData would be an object literal");
  return function state(name) {
    return {
      //id: name,
      name: name,
      value: formData[name] || "",
      onChange: function(ev) {
        const value = ev.target.value;
        formData[name] = value;

        const obj = {};
        Object.assign(obj, formData);

        setFormData(obj);
      }
    }
  }
}

export function updateObject(oldObject, newData) {
  // Ruturns a *new* object so React will re-render

  if(oldObject == null) {
    oldObject = {};
    //console.warn("updateObject: oldObject=" + oldObject + "");
  }

  if(newData == null) {
    console.warn("updateObject: newData=" + newData + "");
    newData = {};
  }

  console.log( "updateObject: oldObject=" + JSON.stringify(oldObject) + " newData=" + JSON.stringify(newData) );

  const obj = {};
  Object.assign(obj, oldObject);
  Object.assign(obj, newData);

  console.log( "updateObject: return obj=" + JSON.stringify(obj));

  return obj;
}