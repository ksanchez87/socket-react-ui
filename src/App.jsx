import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat";
import {
  Card,
  Icon,
  Form,
  Button,
  Container,
  Divider,
} from "semantic-ui-react";

const socket = io.connect("https://socket-nodejs-express-cors.onrender.com");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName != "" && room != "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <Container>
      {!showChat ? (
        <Card fluid>
          <Card.Content header="Unirme al chat" />
          <Card.Content>
            <Form>
              <Form.Field>
                <label>Username:</label>
                <input
                  type="text"
                  placeholder="Ingrese su nombre..."
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Sala:</label>
                <input
                  type="text"
                  placeholder="ID Sala: "
                  onChange={(e) => setRoom(e.target.value)}
                />
              </Form.Field>
              <Form.Field></Form.Field>
              <Button onClick={joinRoom}>Unirme</Button>
            </Form>
          </Card.Content>
          <Card.Content extra>
            <Icon name="user" />4 Friends
          </Card.Content>
        </Card>
      ) : (
        <Chat socket={socket} username={userName} room={room} />
      )}
    </Container>
  );
}

export default App;
