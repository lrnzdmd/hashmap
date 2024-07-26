class LinkedList {
  constructor(key = null, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.DEFAULTSIZE = 16;
    this.size = this.DEFAULTSIZE;
    this.count = 0;
    this.bucket = Array.from({ length: this.DEFAULTSIZE }, () => new LinkedList());
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
    }

    return hashCode;
  }

  resize() {
    const allEntries = this.entries();
    const newSize = this.size * 2;
    this.size = newSize;
    this.count = 0;
    this.bucket = Array.from({length: this.size }, () => new LinkedList());

    allEntries.forEach(entry => {
      this.set(entry[0], entry[1]);
    })

  }

  set(_key, _value) {
    if (this.count >= Math.floor(this.size * this.loadFactor)) {
      this.resize();
    }

    const index = this.hash(_key);
    let bucket = this.bucket[index];

    if (!bucket.key) {
      bucket.key = _key;
      bucket.value = _value;
    } else {
      while (bucket.next !== null) {
        bucket = bucket.next;
      }
      bucket.next = new LinkedList(_key, _value);
    }

    this.count++;
  }

  get(_key) {
    const index = this.hash(_key);
    let bucket = this.bucket[index];

    if (!bucket.key) {
      console.log("key not in hashmap");
      return null;
    } else {
      while (bucket !== null) {
        if (bucket.key === _key) {
          return bucket.value;
        } else {
          bucket = bucket.next;
        }
      }
      return null;
    }
  }

  has(_key) {
    const index = this.hash(_key);
    let bucket = this.bucket[index];

    if (!bucket.key) {
      return false;
    } else {
      while (bucket !== null) {
        if (bucket.key === _key) {
          return true;
        } else {
          bucket = bucket.next;
        }
      }

      return false;
    }
  }

  remove(_key) {
    const index = this.hash(_key);
    let bucket = this.bucket[index];

    if (!bucket.key) {
      return false;
    } else {
      if (bucket.key === _key) {
        bucket = bucket.next;
        this.count--
        return true;
      }
      let prev = bucket;
      let curr = bucket.next;

      while (curr !== null) {
        if (curr.key === _key) {
          prev.next = curr.next;
          this.count--;
          return true;
        }
        prev = curr;
        curr = curr.next;
      }
      return false;
    }
  }

  length() {
    return this.count;
  }

  clear() {
    this.size = this.DEFAULTSIZE;
    this.count = 0;
    this.bucket = Array.from({ length: this.DEFAULTSIZE }, () => new LinkedList());
  }

  keys() {
    const keys = [];

    this.bucket.forEach(bucket => {
      while (bucket !== null) {
        if (bucket.key !== null) {
        keys.push(bucket.key);}
        bucket = bucket.next;
      }
    });

    return keys;
  }

  values() {
    const values = [];

    this.bucket.forEach(bucket => {
      while (bucket !== null) {
        if (bucket.value !== null) {
        values.push(bucket.value);}
        bucket = bucket.next;
      }
    });

    return values;
  }

  entries() {
    const entries = [];

    this.bucket.forEach(bucket => {
      while (bucket !== null) {
        if (bucket.value !== null) {
        entries.push([bucket.key,bucket.value]);}
        bucket = bucket.next;
      }
    });

    return entries;
  }

}

