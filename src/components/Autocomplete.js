import React, { Component, Fragment } from 'react';

class Autocomplete extends Component {
    state = {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ''
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;
        
        let suggestionsListComponent;
            if (showSuggestions && userInput) {
                if (filteredSuggestions.length) {
                    suggestionsListComponent = (
                        <ul class="suggestions">
                            {filteredSuggestions.map((suggestion, index) => {
                                return (
                                    <li 
                                        key={suggestion}
                                        onClick={onClick}
                                    >   
                                        {suggestion}
                                    </li>
                                )
                            })}
                        </ul>
                    )
                } else {
                    suggestionsListComponent = (
                        <p class="no-suggestions">
                            No suggestions.
                        </p>
                    )
                }
            }
        return (
            <Fragment>
                <input 
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}    
                />
                {suggestionsListComponent}
            </Fragment>
        )
    }

    static defaultProps={
        suggestions: []
    }
}

export default Autocomplete;