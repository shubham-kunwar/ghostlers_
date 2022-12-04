import React from "react";

export class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false };
    }

    toggleAnswer = () => {
        this.setState({ show: !this.state.show });
    };

    render() {
        const showAnswer = this.state.show ? "show" : "";
        return (
            <div className={`question ${this.props.className}`}>
                <div className="question-wrapper" onClick={this.toggleAnswer}>
                    <div
                        className="question-color question-wrapper1"
                        style={{ backgroundColor: this.props.color }}
                    ></div>
                    <p className="question-text">{this.props.question}</p>
                </div>
                <p className={`answer-wrapper ${showAnswer}`}>
                    {this.props.answer}
                </p>
            </div>
        );
    }
}
