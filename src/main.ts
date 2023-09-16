// # TS Challenge : classes 그리고 interfaces 를 활용하여, 아래 API를 위한 '미니' 버전을 구현하세요.
// LocalStorage API:
// * Use abstract classes and generics.
// * 추상화 클래스와 제네릭을 사용하세요.
// Usage:
// localStorage.setItem(<key>, <value>)
// localStorage.getItem(<key>)
// localStorage.clearItem(<key>)
// localStorage.clear()
// Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Storage

interface StorageItem<T> {
  key: string;
  value: T;
}

class LocalStorageApi<T> {
  static checkKey(msg: string, key: string) {
    if (key.trim() === "") {
      console.log(`msg : ${msg}`, "Requires a key value");
    }
  }
  setItem({ key, value }: StorageItem<T>) {
    LocalStorageApi.checkKey("setItem()", key);
    localStorage.setItem(key, JSON.stringify(value ?? ""));
  }
  getItem(key: string = ""): T {
    LocalStorageApi.checkKey("getItem()", key);
    const value = localStorage.getItem(key) as string;
    return JSON.parse(value) as T;
  }
  clearItem(key: string = "") {
    LocalStorageApi.checkKey("getItem()", key);
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}

console.log("End Line of LocalApi");
// Geolocation API:
// * overloading을 사용하세요.
// geolocation.getCurrentPosition(successFn);
// geolocation.getCurrentPosition(successFn, errorFn);
// geolocation.getCurrentPosition(successFn, errorFn, optionsObj);
// geolocation.watchPosition(success);
// geolocation.watchPosition(success, error);
// geolocation.watchPosition(success, error, options);
// geolocation.clearWatch(id);
// Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
// * https://huchu.link/ 이동하여 URL 을 단축하세요.
