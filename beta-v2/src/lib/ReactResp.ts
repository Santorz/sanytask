import dynamic from 'next/dynamic';

const ReactResp = dynamic(() => import('react-responsive'), {
  ssr: false,
});

export default ReactResp;
