import { useRouter } from 'next/router';
import Task from '../../../components/Task';
import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';


const Post = inject('tasksStore')(observer(({tasksStore}) => {
    const router = useRouter();
    const { id } = router.query;

    const renderTask = () => {

      if (!tasksStore.task) {
        return <p>Loading...</p>
      }

      const task = tasksStore.task;

      return <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          type='task'
        />
    };

    useEffect(() => {
        tasksStore.fetchTask(id);
    }, []);


  return (
    <>
      <div style={{padding: '20px'}}>
          {renderTask()}
      </div>
    </>
  )
}));

export default Post;
