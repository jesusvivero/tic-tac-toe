import React, { useState } from 'react';

export default function Toggle(props) {

  const [state, setState] = useState({
    isToggle: false
  });

  const handleClick = () => {
    props.onClickOrder(!state.isToggle);
    setState(prevState => {
      return { isToggle: !prevState.isToggle };
    });
  };

  return (
    <button onClick={() => handleClick()}>
      {'Order ' + (state.isToggle ? 'Asc' : 'Desc')}
    </button>
  );
}
