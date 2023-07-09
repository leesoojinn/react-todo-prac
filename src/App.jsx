import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import { styled } from "styled-components";

function App() {
  // todos 상태와 해당 상태를 업데이트하는 setTodos 함수를 선언하고 초기값으로 배열을 설정
  const [todos, setTodos] = useState([
    {
      id: nanoid(),
      content: "영화보기",
      like: 0,
      emoji: "😊",
    },
    {
      id: nanoid(),
      content: "노래듣기",
      like: 0,
      emoji: "😐",
    },
  ]);
  // content, emoji 내용을 저장하고 업데이트
  const [content, setContent] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("😊");
  // 초기값으로 fasle, true면 반대로 바뀜
  const [darkMode, setDarkMode] = useState(false);

  // input에 내용이 없으면 추가를 해도 todos에 추가 안된다
  // 새로운 todo를 추가
  const addTodoHandler = () => {
    if (content.trim() === "") {
      return;
    }

    const newTodo = {
      id: nanoid(),
      content,
      like: 0,
      emoji: selectedEmoji,
    };

    // todos를 먼저 펼쳐주고 새로운 todo를 보여준다
    setTodos([...todos, newTodo]);
    setContent("");
  };

  return (
    // props 사용
    <s.Container darkMode={darkMode}>
      <div>
        <input value={content} onChange={(e) => setContent(e.target.value)} />

        <select
          value={selectedEmoji}
          onChange={(e) => setSelectedEmoji(e.target.value)}
        >
          <option value="😊">😊</option>
          <option value="😐">😐</option>
          <option value="😡">😡</option>
        </select>

        <button onClick={addTodoHandler}>추가</button>
        {/* 버튼을 클릭되면 setDarkMode가 호출되어 다크 모드를 활성화하거나 비활성화한다. */}
        <button onClick={() => setDarkMode(!darkMode)}>
          {/* 다크모드를 누르면 라이트 모드로 바뀐다 */}
          {darkMode ? "라이트 모드" : "다크 모드"}
        </button>

        <div>
          {/* 유니크한 값으로 key에 넣고, todo의 내용, 이모지, 좋아요를 보여준다. */}
          {todos.map((todo) => (
            <div key={todo.id}>
              <span>{todo.content}</span>
              <span>{todo.emoji}</span>
              <span>{todo.like}</span>
              <button
                // item의 아이디가 todo의 아이디가 같으면 좋아요를 눌렀을 때 1을 더한다.
                onClick={() => {
                  const likeTodo = todos.map((item) =>
                    item.id === todo.id
                      ? { ...item, like: item.like + 1 }
                      : item
                  );
                  setTodos(likeTodo);
                }}
              >
                좋아요
              </button>
              <button
                // item의 아이디와 todo의 아이디가 같지 않은 것만 화면에 보여준다.
                onClick={() => {
                  const deleteTodo = todos.filter(
                    (item) => item.id !== todo.id
                  );
                  setTodos(deleteTodo);
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </s.Container>
  );
}

export default App;

const s = {
  Container: styled.div`
    /* props.darkMode 값이 true이면 배경색이 검정, false면 흰색으로  */
    background-color: ${(props) => (props.darkMode ? "#000" : "#fff")};
    color: ${(props) => (props.darkMode ? "#fff" : "#000")};
  `,
};
