import React from 'react'
import { render as privateRender } from '@testing-library/react'
import {QueryClientProvider, QueryClient} from 'react-query';

const client = new QueryClient();

const render = (elm: React.ReactElement) => {
    return (
        <QueryClientProvider client={client}>
            {elm}
        </QueryClientProvider>
    )
}

export * from '@testing-library/react';
export {render};
