import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import ToggleBlogView from '../components/ToggleBlogView';

describe('<Togglable />', () => {
  let component;

  const handleLike = () => {
    const likeCount = document.querySelector('#like');
    likeCount.textContent = '3';
  };
  beforeEach(() => {
    component = render(
      <ToggleBlogView
        title="How to use useState in React"
        author="Adebola"
        buttonLabel="view"
      >
        <div id="likes-url">
          likes: <span id="like">2</span> likes
          <button type="button" onClick={handleLike}>
            like
          </button>
          <br />
          url: medium.com/blog
          <br />
          <button type="button">delete blog</button>
        </div>
      </ToggleBlogView>,
    );
  });

  test('renders blog title and author', () => {
    const div = component.container.querySelector('#title-author');
    const element = component.getByText('view');
    expect(div).toHaveTextContent('How to use useState in React by Adebola');
    expect(element).toBeDefined();
  });

  test('renders its children', () => {
    const div = component.container.querySelector('#togglable-child');
    expect(div).toBeDefined();
  });

  test('at start children are not displayed', () => {
    const div = component.container.querySelector('#togglable-child');
    expect(div).toHaveStyle('display: none');
  });

  test('show children after button is clicked', () => {
    const button = component.getByText('view');
    fireEvent.click(button);
    const div = component.container.querySelector('#togglable-child');
    expect(div).not.toHaveStyle('display: none');
  });

  test('show the url and likes after view button is clicked', () => {
    const button = component.getByText('view');
    fireEvent.click(button);
    const div = component.container.querySelector('#likes-url');
    expect(div).toHaveTextContent('2 likes');
  });

  test('event handler is called twice if like button is clicked twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    const div = component.container.querySelector('#like');
    expect(div).toHaveTextContent('3');
    fireEvent.click(button);
    expect(div).toHaveTextContent('3');
  });
});
