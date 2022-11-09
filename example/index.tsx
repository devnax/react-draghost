import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DraggableWrapper, Droppable } from '../.';

const Item = ({ color, title }: any) => {
  return (
    <div
      style={{
        height: 50,
        background: color || "red",
        margin: 8,
        borderRadius: 10,
      }}
    >{title}</div>
  )
}

const Box = ({ children }: any) => {
  return (
    <div
      style={{
        height: "100%",
        background: "#ccc",
        margin: 8,
        borderRadius: 10,
        minWidth: 300
      }}
    >{children}</div>
  )
}

const DropBox = ({ children, ...props }: any) => {
  const [state, setState] = React.useState([
    { title: "First", color: "red" },
    { title: "Second", color: "green" },
    { title: "Third", color: "blue" },
    { title: "Fourth", color: "yellow" },
  ])
  return (
    <Box>
      <Droppable
        {...props}
      >
        {children}
        {
          state.map((item, idx) => <Item key={idx} {...item} />)
        }
      </Droppable>
    </Box>
  )
}

const App = () => {
  const [show, setShow] = React.useState(false)

  return (
    <div>
      <DraggableWrapper id={"main"} direction="horizontal" onDrop={(p) => {
      }}>
        <div style={{
          display: "flex"
        }}>
          <button onClick={() => setShow(!show)}>Toggle</button>
          {
            show && <DropBox
              id="first"
              className="Ok"
              onOver={(props) => {
                console.log(props);

              }}
              onOut={(props) => {
                console.log(props);
              }}

              onDrop={({ data }) => {
                console.log(data);

              }}
            />
          }
          <DropBox
            id="first1"

            sendData={() => {
              return { ok: 12 }
            }}
          >
            <div style={{ padding: 10, background: "orange" }}>
              <DropBox
                selfOnly
                style={{ padding: 20, background: "skyblue" }}
                id="child"
                onShadow={(props) => {
                  if (props.el) {
                    props.el.style.background = "blue"
                  }
                }}

              />
            </div>
          </DropBox>
        </div>
      </DraggableWrapper >
    </div >
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
