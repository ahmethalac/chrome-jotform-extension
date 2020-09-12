import axios from 'axios';
import { getFromChrome } from './chromeService';

const getApiKeyPromise = () => getFromChrome('apiKey');
export const baseURL = 'http://api.jotform.com/';

export const createTodoList = async name => {
  const requestBody = {
    questions: [
      { type: 'control_textbox', text: 'Todo Name', order: '1' },
      {
        type: 'control_radio', text: 'Status', order: '2', options: 'Done|Not Done',
      },
      { type: 'control_button', text: 'Submit', order: '3' },
    ],
    properties: { title: `todoList_${name}`, type: 'CARD' },
  };
  const JOTFORM_API_KEY = await getApiKeyPromise();
  return axios.put(`${baseURL}user/forms?apiKey=${JOTFORM_API_KEY}`, requestBody);
};

export const submitTodo = async (formId, name, done) => {
  const requestBody = [
    {
      1: { text: name },
      2: { text: done ? 'Done' : 'Not Done' },
    },
  ];
  const JOTFORM_API_KEY = await getApiKeyPromise();
  return axios.put(`${baseURL}form/${formId}/submissions?apiKey=${JOTFORM_API_KEY}`, requestBody);
};

export const changeTodoState = async (submissionID, done) => {
  const requestBody = `submission[2]=${done ? 'Done' : 'Not Done'}`;
  const JOTFORM_API_KEY = await getApiKeyPromise();
  return axios.post(`${baseURL}submission/${submissionID}?apiKey=${JOTFORM_API_KEY}`, requestBody);
};

export const getTodoLists = async () => {
  const JOTFORM_API_KEY = await getApiKeyPromise();
  return axios.get(`${baseURL}user/forms?apikey=${JOTFORM_API_KEY}&limit=100`)
    .then(response => {
      if (response.data.responseCode !== 200) {
        throw Error('Wrong API Key');
      } else {
        return response;
      }
    })
    .then(response => response.data.content)
    .then(forms => forms.filter(form => form.status === 'ENABLED'))
    .then(enabledForms => enabledForms.filter(form => form.title.startsWith('todoList_')));
};

export const getTodos = async formId => {
  const JOTFORM_API_KEY = await getApiKeyPromise();
  return axios.get(`${baseURL}form/${formId}/submissions?apiKey=${JOTFORM_API_KEY}`)
    .then(response => response.data.content)
    .then(submissions => submissions.map(submission => ({
      id: submission.id,
      name: submission.answers['1'].prettyFormat,
      done: submission.answers['2'].prettyFormat === 'Done',
    })));
};

export const deleteTodoList = async formId => {
  const JOTFORM_API_KEY = await getApiKeyPromise();
  return axios.delete(`${baseURL}form/${formId}?apiKey=${JOTFORM_API_KEY}`);
};

export const deleteTodo = async submissionId => {
  const JOTFORM_API_KEY = await getApiKeyPromise();
  return axios.delete(`${baseURL}submission/${submissionId}?apiKey=${JOTFORM_API_KEY}`);
};

export const changeTitle = async (formId, newTitle) => {
  const requestBody = {
    properties: {
      title: `todoList_${newTitle}`,
    },
  };
  const JOTFORM_API_KEY = await getApiKeyPromise();
  return axios.put(`${baseURL}form/${formId}/properties?apiKey=${JOTFORM_API_KEY}`, requestBody);
};

export const changeTodoName = async (submissionId, newName) => {
  const requestBody = `submission[1]=${newName}`;
  const JOTFORM_API_KEY = await getApiKeyPromise();
  return axios.post(`${baseURL}submission/${submissionId}?apiKey=${JOTFORM_API_KEY}`, requestBody);
};
