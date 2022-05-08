import React, { useEffect} from 'react'
import ContentCyberBugs from '../../components/CyberBugs/main/ContentCyberBugs'
import HeaderCyberBugs from '../../components/CyberBugs/main/HeaderCyberBugs'
import InforCyberBugs from '../../components/CyberBugs/main/InforCyberBugs'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchProjectDetailApi } from '../../redux/actions/ProjectAction'
export default function CyberBoard(props) {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actFetchProjectDetailApi(projectId));
  }, []);
  const { projectDetail } = useSelector(state => state.ProjectReducer);
  return (
    <div className='main'>
      <HeaderCyberBugs projectDetail={projectDetail}></HeaderCyberBugs>
      <InforCyberBugs projectDetail={projectDetail}></InforCyberBugs>
      <ContentCyberBugs projectDetail={projectDetail}></ContentCyberBugs>
    </div>
  )
}
