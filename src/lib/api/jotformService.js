import axios from 'axios';
import { JOTFORM_API_KEY } from '../../constants/keys';

export const baseURL = 'http://api.jotform.com/';

export const createTodoList = name => {
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
  return axios.put(`${baseURL}user/forms?apiKey=${JOTFORM_API_KEY}`, requestBody);
};

export const submitTodo = (formId, name, done) => {
  const requestBody = [
    {
      1: { text: name },
      2: { text: done ? 'Done' : 'Not Done' },
    },
  ];
  return axios.put(`${baseURL}form/${formId}/submissions?apiKey=${JOTFORM_API_KEY}`, requestBody);
};

export const changeTodoState = (submissionID, done) => {
  const requestBody = `submission[2]=${done ? 'Done' : 'Not Done'}`;
  return axios.post(`${baseURL}submission/${submissionID}?apiKey=${JOTFORM_API_KEY}`, requestBody);
};

export const getTodoLists = () => axios.get(`${baseURL}user/forms?apikey=${JOTFORM_API_KEY}&limit=100`)
  .then(response => response.data.content)
  .then(forms => forms.filter(form => form.status === 'ENABLED'))
  .then(enabledForms => enabledForms.filter(form => form.title.startsWith('todoList_')));

export const getTodos = formId => axios.get(`${baseURL}form/${formId}/submissions?apiKey=${JOTFORM_API_KEY}`)
  .then(response => response.data.content)
  .then(submissions => submissions.map(submission => ({
    id: submission.id,
    name: submission.answers['1'].prettyFormat,
    done: submission.answers['2'].prettyFormat === 'Done',
  })));

export const deleteTodoList = formId => axios.delete(`${baseURL}form/${formId}?apiKey=${JOTFORM_API_KEY}`);

export const deleteTodo = submissionId => axios.delete(`${baseURL}submission/${submissionId}?apiKey=${JOTFORM_API_KEY}`);

export const changeTitle = (formId, newTitle) => {
  const requestBody = {
    properties: {
      title: `todoList_${newTitle}`,
    },
  };
  return axios.put(`${baseURL}form/${formId}/properties?apiKey=${JOTFORM_API_KEY}`, requestBody);
};

export const changeTodoName = (submissionId, newName) => {
  const requestBody = `submission[1]=${newName}`;
  return axios.post(`${baseURL}submission/${submissionId}?apiKey=${JOTFORM_API_KEY}`, requestBody);
};
