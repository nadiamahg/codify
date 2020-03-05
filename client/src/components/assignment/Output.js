import React from 'react';

export default function Output(props) {
  let result = props.result.data.body.output;
  return (
    <div>
      <p className="compiledCode"> {result}</p>
    </div>
  );
}
