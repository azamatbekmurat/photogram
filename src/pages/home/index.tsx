import Layout from '@/components/layout';
import * as React from 'react';

export interface IHomeProps {
}


const Home: React.FunctionComponent<IHomeProps> = () => {
    return (
        <Layout>
            <div>
                Home
            </div>
        </Layout>
        
    );
  
}

export default Home
