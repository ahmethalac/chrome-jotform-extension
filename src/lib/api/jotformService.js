import axios from 'axios';
import { JOTFORM_API_KEY } from '../../constants/keys';

export const baseURL = 'http://api.jotform.com/';

export const createTodoList = name => {
  const requestBody = {
    questions: [
      {
        type: 'control_textbox',
        text: 'Todo Name',
        order: '1',
        required: 'Yes',
      },
      {
        type: 'control_textbox',
        text: 'Done',
        order: '2',
      },
    ],
    properties: {
      title: `todoList_${name}`,
      height: '600',
    },
  };
  return axios.put(`${baseURL}user/forms?apiKey=${JOTFORM_API_KEY}`, requestBody);
};

export const submitTodo = (formId, name) => {
  const requestBody = [
    {
      1: {
        text: name,
      },
      2: {
        text: 'false',
      },
    },
  ];
  return axios.put(`${baseURL}form/${formId}/submissions?apiKey=${JOTFORM_API_KEY}`, requestBody);
};

export const changeTodoState = (submissionID, done) => {
  const requestBody = `submission[2]=${done}`;
  return axios.post(`${baseURL}submission/${submissionID}?apiKey=${JOTFORM_API_KEY}`, requestBody);
};
