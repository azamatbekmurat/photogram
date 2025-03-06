import Layout from '@/components/layout';
import * as React from 'react';

export interface IMyPhotosProps {
}


const MyPhotos: React.FunctionComponent<IMyPhotosProps> = () => {
    return (
        <Layout>
            <div>
                My Photos
            </div>
        </Layout>
    );
  
}

export default MyPhotos
