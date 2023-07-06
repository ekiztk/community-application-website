import ApplicationSettings from 'modals/ApplicationSettings';
import NewApplication from 'modals/NewApplication';
import ResponseDetail from 'modals/ResponseDetail';
import UserDetail from 'modals/UserDetail';

const modalData = [
  {
    name: 'applicationSettings',
    element: ApplicationSettings,
  },
  {
    name: 'newApplication',
    element: NewApplication,
  },
  {
    name: 'responseDetail',
    element: ResponseDetail,
  },
  {
    name: 'userDetail',
    element: UserDetail,
  },
];

export default modalData;
