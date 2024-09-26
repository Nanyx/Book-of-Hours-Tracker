import { Button, ButtonGroup } from 'react-bootstrap';

const BookList = ({newBook, list = [], selected, click}) => {
  return (
    <ButtonGroup vertical>
      {/*<Button onClick={newBook}>New</Button>*/}
      {list.map((item) => <Button key={item.id} variant='secondary' selected={selected == item.id} onClick={() => click(item.id)}>{item.name}</Button>)}
    </ButtonGroup>
  );
}

export default BookList;