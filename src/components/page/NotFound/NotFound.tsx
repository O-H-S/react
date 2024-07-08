import { useNavigate } from 'react-router-dom';

import ErrorFallback from '@/components/common/ErrorFallback/ErrorFallback';
import { PATH } from '@constants/path';

const NotFound = () => {
    const navigate = useNavigate();
  
    //useMediaQuery();
  
    return (
      <div> 존재하지 않는 페이지입니다</div>
    );
    //return <Error resetError={() => navigate(PATH.ROOT)} />;
  };
  
  export default NotFound;
