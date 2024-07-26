class LinkedList {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}


class HashMap {

constructor (size = 16, loadFactor = 0.75) {
    this.size = size;
    this.count = 0;
    this.bucket =  Array.from({ length: this.size }, () => new LinkedList());
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




set(_key, _value) {
    if (this.count >= Math.floor(this.size * this.loadFactor)) {
        return; // resize()
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

    this.count++
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



}