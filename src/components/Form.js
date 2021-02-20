import React, { useState } from "react";
import {
  Row,
  Col,
  Form as FormAntd,
  Input,
  notification,
  Button,
  List,
  Typography,
} from "antd";
import uniqid from "uniqid";
import { CheckOutlined } from "@ant-design/icons";

const { Text } = Typography;
export default function Form() {
  const [data, setData] = useState("");
  const [lista, setLista] = useState([]);

  const sendData = () => {
    if (!data || data.length < 5) {
      notification["warning"]({
        message: "Please fill a valid name",
      });
    } else {
      notification["success"]({
        message: "Voilà",
      });
      const nombre = {
        id: uniqid(),
        tituloNombre: data,
      };
      setLista([...lista, nombre]);
      setData(``);
    }
  };

  const deleteName = (id) => {
    const nuevaArray = lista.filter((item) => item.id !== id);
    setLista(nuevaArray);
    notification["success"]({
      message: "Task deleted",
    });
  };

  return (
    <div>
      <Row gutter={24}>
        <Col md={4} />
        <Col md={16}>
          <h2
            style={{
              fontFamily: "monospace",
              textAlign: "center",
              paddingBottom: "20px",
              paddingTop: "20px",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            TODO LIST
          </h2>
          <FormAntd onFinish={sendData}>
            <FormAntd.Item>
              <Input
                placeholder="Task name"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </FormAntd.Item>
            <Button type="primary" htmlType="submit" block>
              Send
            </Button>
          </FormAntd>
          <List
            type="success"
            bordered
            header={<div style={{ textAlign: "center" }}>TODO TASK</div>}
          >
            <Text>
              {lista.map((e) => {
                return (
                  <List.Item key={e.id} style={{ fontSize: "16px" }}>
                    {e.tituloNombre}
                    <div
                      style={{ textAlign: "right", justifyContent: "center" }}
                    >
                      <Button onClick={() => deleteName(e.id)}>
                        <CheckOutlined />
                      </Button>
                    </div>
                  </List.Item>
                );
              })}
            </Text>
          </List>
        </Col>
        <Col md={4} />
      </Row>
    </div>
  );
}
