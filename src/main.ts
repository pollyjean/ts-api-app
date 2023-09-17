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

interface StorageValue<V> {
  value: V;
}

abstract class LocalStorageElement<V> {
  key!: string;
  value!: StorageValue<V>["value"] | undefined;
  constructor(_key?: string, _value?: V | undefined) {
    if (_key && _value) {
      this.key = _key;
      this.value = _value;
      this.setItem(_key, _value);
    } else {
      this.key = "";
      this.value = undefined;
    }
  }
  checkRequiredKey(key: string) {
    if ((key + "" || "").trim().length > 0) return key;
    return "";
  }
  setItem(_key: string, _value: V) {
    // const key = this.key !== "" ? this.key : _key;
    // const value = this.value ? this.value : _value;
    this.key = _key;
    this.value = _value;

    const checkedKey = this.checkRequiredKey(_key);
    if (checkedKey === "") return "";
    const valueJSONstring = { _value };
    localStorage.setItem(_key + "", JSON.stringify(valueJSONstring));
  }
}

class LocalStorageApi<V> extends LocalStorageElement<V> {
  constructor(key?: string, value?: V) {
    if (key && value) {
      super(key, value);
      this.key = key;
      this.value = value;
      super.checkRequiredKey(this.key);
    } else {
      super(undefined, undefined);
    }
  }
  private static KEY_REQUIRE = "Key is required";
  protected static checkRequiredKey(_key: string) {
    if ((_key + "" || "").trim().length > 0) {
      return _key;
    }
    console.error(LocalStorageApi.KEY_REQUIRE);
    return "";
  }

  getItem(_key: string = "") {
    super.checkRequiredKey(_key);
    const value = localStorage.getItem(_key) as string;
    if (value) {
      const json = JSON.parse(value);
      const data = Object.values(json)[0];
      return data;
    }
    console.error(LocalStorageApi.KEY_REQUIRE);
    return null;
  }
  clearItem(_key: string = "") {
    super.checkRequiredKey(_key);
    localStorage.removeItem(_key);
  }

  clear() {
    localStorage.clear();
  }
}

const numApi = new LocalStorageApi<number>();
numApi.setItem("one", 1);
console.log("get 인자 없이 사용 에러 테스트 : ", numApi.getItem());
console.log("result : ", numApi.getItem("one"));
const stringApi = new LocalStorageApi<string>("alpha", "a");
console.log("get 잘못된 값 삭제 테스트 result : ", stringApi.getItem("a"));
console.log("result : ", stringApi.getItem("alpha"));
console.log("End Line of LocalApi");
const boolApi = new LocalStorageApi();
boolApi.setItem("Truth", true);
console.log("result : ", boolApi.getItem("Truth"));
boolApi.setItem("Lie", false);
console.log("result : ", boolApi.getItem("Lie"));
console.log("잘못이름 삭제");
boolApi.clearItem("Lying");
console.log("삭제");
boolApi.clearItem("Lie");

const allApi = new LocalStorageApi();
allApi.clear();

const arrayApi = new LocalStorageApi<number[]>("books", [1, 2, 3, 4]);
console.log("result : ", arrayApi.getItem("books"));

const objectApi = new LocalStorageApi();
objectApi.setItem("objs", { a: "c" });
console.log("여기서?", objectApi);
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
