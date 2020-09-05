/* global chrome */

const mockStorage = {
  shortcuts: {
    w: 'what is',
    h: 'how to',
  },
};

export const storeInChrome = (key, value) => {
  switch (process.env.NODE_ENV) {
    case 'production': {
      return new Promise(resolve => chrome.storage.sync.set({ [key]: value }, () => {
        resolve({ key, value });
      }));
    }
    case 'development': {
      return new Promise(resolve => {
        mockStorage[key] = value;
        resolve({ key, value });
      });
    }
    default: {
      return false;
    }
  }
};

export const getFromChrome = key => {
  switch (process.env.NODE_ENV) {
    case 'production': {
      return new Promise(resolve => chrome.storage.sync.get(key, r => {
        if (key) {
          resolve(r[key]);
        } else {
          resolve(r);
        }
      }));
    }
    case 'development': {
      return new Promise(resolve => resolve(mockStorage[key]));
    }
    default: {
      return false;
    }
  }
};

export const removeFromChrome = key => {
  switch (process.env.NODE_ENV) {
    case 'production': {
      return new Promise(resolve => chrome.storage.sync.remove(key, () => {
        resolve(true);
      }));
    }
    case 'development': {
      return new Promise(resolve => {
        delete mockStorage[key];
        resolve(true);
      });
    }
    default: {
      return false;
    }
  }
};

// FOR DEBUG PURPOSES
if (process.env.NODE_ENV === 'production') {
  chrome.storage.sync.get(null, response => console.log(response));
}

export default 'dummyExport';
