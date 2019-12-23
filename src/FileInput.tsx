import React, { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addVPNClient } from './actions';

export function FileInput() {
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const submit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(addVPNClient((inputEl as any).current.files[0].name));
  };

  return (
    <form onSubmit={submit}>
      <label>
        Upload file:
        <input name="file" type="file" ref={inputEl}/>
      </label>
      <br/>
      <button type="submit">Submit</button>
    </form>
  );
}
