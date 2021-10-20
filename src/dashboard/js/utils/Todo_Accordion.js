import React, { useContext } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Chevron from './Chevron';
import { DarkThemeContext } from '../../..';

// CSS
import '../../css/todo-accordion.css';

const Todo_Accordion = (props) => {
  // const [setActive, setActiveState] = useState("");
  // const [setHeight, setHeightState] = useState("0px");
  // const [setRotate, setRotateState] = useState("accordion__icon");

  // Hooks
  const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);

  // Toggle accordion functionality
  const toggleAccordion = (e) => {
    let accordionInFocus = e.currentTarget;
    let allOtherAccordionsParents = Array.from(
      accordionInFocus.parentElement.parentElement.childNodes
    ).filter((accordion) => accordion.firstElementChild !== accordionInFocus);
    let allOtherAccordions = allOtherAccordionsParents.map(
      (parentElement) => parentElement.firstElementChild
    );

    for (let i of allOtherAccordions) {
      if (i.classList.contains('active')) {
        i.classList.remove('active');
        i.nextElementSibling.style.maxHeight = '0px';
        i.querySelector('.accordion__icon').classList.remove('rotate');
      }
    }

    if (!accordionInFocus.classList.contains('active')) {
      accordionInFocus.classList.add('active');
      accordionInFocus.nextElementSibling.style.maxHeight = '200px';
      accordionInFocus
        .querySelector('.accordion__icon')
        .classList.add('rotate');
    } else {
      accordionInFocus.classList.remove('active');
      accordionInFocus.nextElementSibling.style.maxHeight = '0px';
      accordionInFocus
        .querySelector('.accordion__icon')
        .classList.remove('rotate');
    }
    // setActiveState(setActive === "" ? "active" : "");
    // setHeightState(setActive === "active" ? "0px" : `${220}px`);
    // setRotateState(
    //   setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    // );
  };

  const { snumber, id, title, children, className } = props;

  return (
    <Segment
      inverted={isDarkTheme}
      className='accordion__section each-todo p-0'
      id={id}
    >
      <button
        type='button'
        className={`accordion my-primary-bg `}
        // *${setActive}
        onClick={toggleAccordion}
        style={{ borderRadius: '.29rem' }}
      >
        <Header
          className={`me-2 me-md-2 me-xl-3 my-0 todo-snumber ${className}`}
        >
          {snumber}
        </Header>
        <h4 className='accordion__title my-0 my-primary-text'>{title}</h4>
        <Chevron
          className={`accordion__icon `}
          // ${setRotate}
          width={10}
          fill={tealColorString}
        />
      </button>

      <div
        className='accordion__content my-primary-bg'
        style={{ maxHeight: '0px' }}
      >
        <div className='px-4 py-2 accordion_content_container'>{children}</div>
      </div>
    </Segment>
  );
};
export default Todo_Accordion;
