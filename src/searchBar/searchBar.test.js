import React from 'react'
import {render} from '@testing-library/react'
import { SearchBar } from './searchBar'

it("renders search bar", () => {
    const {queryByTestId} = render(<SearchBar/>)
    expect(queryByTestId("foodInput")).toBeTruthy()
    
    expect(queryByTestId("locationInput")).toBeTruthy()
})