import React, { Component, Fragment } from 'react';

class Autocomplete extends Component {
    state = {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ''
    }
    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        const filteredSuggestions = suggestions.filter(
            (suggestion) => 
                suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        )

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        })
    }
    onClick = suggestion => {
        this.props.addEntrance(suggestion);
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput:''
        })
    }
    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            })
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1});
        } else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1})
        }
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
                        <ul className="suggestions">
                            {filteredSuggestions.map((suggestion, index) => {
                                return (
                                    <li 
                                        key={suggestion.id}
                                        onClick={() => onClick(suggestion)}
                                    >   
                                        {suggestion.name}
                                    </li>
                                )
                            })}
                        </ul>
                    )
                } else {
                    suggestionsListComponent = (
                        <p className="no-suggestions">
                            No suggestions.
                        </p>
                    )
                }
            }
        return (
            <Fragment>
                <input 
                    autoComplete="off"
                    name="autocomplete"
                    id="autocomplete"
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