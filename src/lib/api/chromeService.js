/* global chrome */

const mockStorage = {};

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
      return chrome.storage.sync.get(key);
    }
    case 'development': {
      return mockStorage[key];
    }
    default: {
      return false;
    }
  }
};

export default 'dummyExport';
