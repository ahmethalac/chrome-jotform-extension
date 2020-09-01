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
      chrome.storage.sync.set({ [key]: value });
      return true;
    }
    case 'development': {
      mockStorage[key] = value;
      return true;
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

export default 'dummyExport';
