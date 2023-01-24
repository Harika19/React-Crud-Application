import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ onAdd, title, showAdd }) => {
  // const onClick = () => {
  //     console.log('Clickkk');
  // }
  return (
    <header className="header">
      <h1 style={headingstyle}> Task {title} !!!! </h1>
      <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? "CLOSE" : "ADD"}
        onClick={onAdd}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS IN JS
const headingstyle = { color: "blue" };

export default Header;
