import React, { Component } from "react";
import {
  Col,
  Row,
  UncontrolledTooltip,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Input,
  Label,
} from "reactstrap";
// import { Send } from "react-icons/bs";
// import { RiDeleteBin6Line, Send } from "react-icons/ri";
// import { AiOutlineInfoCircle } from "react-icons/ai";
import { Send } from "react-feather";
import { Trash2 } from "react-feather";
import { BiMessageRoundedDetail } from "react-icons/bi";
// import { BiLeftArrow } from "react-icons/bi";
import "./sample.css";
import SweetAlert from "react-bootstrap-sweetalert";
// import getPersianDateFormat from "./../../common/persianDate";
import { toast } from "react-toastify";
// import api from "../../../../utility/api/api";
import userImage from "../../../assets/img/pages/card-image-5.jpg";
import { Link } from "react-router-dom";
import defaultImg from "../../../assets/img/profile/Generic-profile-picture.jpg.webp";
import { Item } from "react-contexify";

class Comment extends Component {
  state = {
    defaultAlert: false,
    confirmAlert: false,
    successAlert: false,
    parentModal: false,
    replyModal: false,
    confirmSend: false,
    answer: "",
  };
  toggleParentModal = () => {
    this.setState((prevState) => ({
      parentModal: !prevState.parentModal,
    }));
  };
  toggleReplyModal = () => {
    this.setState({ replyModal: !this.state.replyModal });
  };
  handleAnswer = async () => {
    let answer = this.state.answer;
    await this.props.toggleAnswered(answer, this.props.cid);
    this.toggleParentModal();
    //call API autosave
  };
  updateInput = (e, name) => {
    this.toggleDirection(e);
    this.setState({ [name]: e.target.value });
  };
  toggleDirection = (e) => {
    if (e.target.value && e.target.value[0].match(/[a-z]/i))
      e.target.style.direction = "ltr";
    else e.target.style.direction = "rtl";
  };

  handleAlert = (state, value) => {
    this.setState({
      [state]: value,
    });
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div className="comment-item">
          <Row>
            <Col lg="1" className="comment-sender-section">
              <img src={data.imgUrl} className="comment-sender-image" />
            </Col>
            <Col lg="7" xs="6" className="comment-title-container">
              <BiMessageRoundedDetail
                size="14"
                className="comment-title-icon"
              />
              <span className="comment-title"> {data.user.name} </span>
              <Col lg="12" className="comment-body">
                {data.content.length >= 50
                  ? data.content.substring(0, 50) + "..."
                  : data.content}
              </Col>
            </Col>
            <Col lg="4" xs="6">
              <Row className="justify-content-end">
                <div className="chip-wrapper" style={{ marginLeft: "10px" }}>
                  <div className="chip m-0">
                    <div className="chip-body">
                      {data.answer.length !== 0 ? (
                        <span className="chip-text" id="confirm-chip">
                          <span className="bullet bullet-success bullet-xs"></span>
                          <span className="text-capitalize ml-25">
                            ???????? ???????? ??????
                          </span>
                        </span>
                      ) : (
                        <span className="chip-text">
                          <span className="bullet bullet-danger bullet-xs"></span>
                          <span className="text-capitalize ml-25">
                            ???????? ???????? ????????
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span
                  id={`remove-comment-${this.props.cid}`}
                  onClick={() => this.handleAlert("defaultAlert", true)}
                >
                  <Trash2
                    size="20"
                    color="#ff531f"
                    style={{ marginLeft: "10px" }}
                  />
                </span>
                <span
                  id={`main-comment-${this.props.cid}`}
                  onClick={() => this.toggleParentModal()}
                >
                  <BiMessageRoundedDetail size="20" color="orange" />
                </span>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col
              xs="12"
              lg="12"
              style={{
                textAlign: "left",
                fontSize: "10px",
                width: "100% ",
              }}
            >
              ?????????? ?????????? ????????:{" "}
              <span className="fonticon-wrap" style={{ textAlign: "left" }}>
                {data.date}
              </span>
            </Col>
          </Row>
        </div>
        <SweetAlert
          title="?????? ???? ?????? ?????? ???????? ?????????????? ????????????"
          warning
          show={this.state.defaultAlert}
          showCancel
          reverseButtons
          cancelBtnBsStyle="warning"
          confirmBtnBsStyle="danger"
          confirmBtnText="???????? ?????? ????"
          cancelBtnText="??????"
          onConfirm={() => {
            this.props.handleDelete(this.props.cid);
            this.handleAlert("defaultAlert", false);
          }}
          onCancel={() => {
            this.handleAlert("defaultAlert", false);
          }}
        >
          ?????? ???? ?????? ?????????????????? ???????????? ?????? ???????? ???? ?????????????????? ????????!
        </SweetAlert>

        <SweetAlert
          success
          title="???????????? ????????"
          confirmBtnBsStyle="success"
          confirmBtnText="????????"
          show={this.state.successAlert}
          onConfirm={() => {
            this.handleAlert("defaultAlert", false);
            this.handleAlert("confirmAlert", false);
            this.handleAlert("successAlert", false);
          }}
        >
          <p className="sweet-alert-text"> ???????? ?????????????? ???? ???????????? ?????? ???? </p>
        </SweetAlert>
        <Modal
          isOpen={this.state.parentModal}
          toggle={this.toggleParentModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleParentModal}>???????? ????????</ModalHeader>
          <ModalBody>
            <Row className="pr-1 pl-1 pt-1">
              <span
                style={{ fontSize: 14, color: "#ff9f43", fontWeight: "bold" }}
              >
                {" "}
                ?????????? ?????? ????????:{" "}
              </span>
              <span style={{ fontWeight: 300, fontSize: 14 }}>
                {data.user.name}
              </span>
            </Row>
            <Row className="pr-1 pl-1 pt-1">
              <span
                style={{ fontSize: 15, color: "#ff9f43", fontWeight: "bold" }}
              >
                {" "}
                ?????? ????????:{" "}
              </span>
              <span style={{ fontWeight: 300, fontSize: 15 }}>
                {data.content}
              </span>
            </Row>
            <Row className="pr-1 pl-1 pt-1">
              <span
                style={{ fontSize: 14, color: "#ff9f43", fontWeight: "bold" }}
              >
                {" "}
                ?????????? ??????????:{" "}
              </span>
              <span style={{ fontWeight: 300, fontSize: 14 }}>{data.date}</span>
            </Row>

            <SweetAlert
              title="?????? ???? ?????????? ?????? ???????? ?????????????? ????????????"
              warning
              show={this.state.confirmSend}
              showCancel
              reverseButtons
              confirmBtnBsStyle="success"
              cancelBtnBsStyle="danger"
              confirmBtnText="?????????????????? ????"
              cancelBtnText="??????"
              //ersal api onConfirm
              onConfirm={() => {
                this.handleAnswer();
                this.setState({ confirmSend: false });
              }}
              onCancel={() => {
                this.setState({ confirmSend: false });
              }}
            >
              ?????? ???? ?????????????? ?????????????????? ???????????? ?????? ?????????? ???? ???????????? ????????!
            </SweetAlert>
            {data.answer.length === 0 ? (
              <div>
                <div className="form-label-group mt-2 mb-0">
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    rows="3"
                    value={this.state.answer}
                    placeholder="????????"
                    maxLength="500"
                    onChange={(e) => this.updateInput(e, "answer")}
                  ></Input>
                  <Label> ????????: </Label>
                  <small
                    className={`counter-value float-right ${
                      this.state.answer.length >= 500 ? "bg-danger" : ""
                    }`}
                  >
                    {`${this.state.answer.trim().length}/500`}
                  </small>
                </div>

                <Button
                  outline
                  color="success"
                  onClick={() => this.setState({ confirmSend: true })}
                  disabled={this.state.answer.trim() === ""}
                  className="mt-1"
                >
                  ?????????? ????????
                </Button>
              </div>
            ) : (
              <Row className="pr-1 pl-1 pt-1">
                <span
                  style={{
                    fontSize: 15,
                    color: "#ff9f43",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  ?????? ????????:{" "}
                </span>
                <span style={{ fontWeight: 300, fontSize: 15 }}>
                  {data.answer}
                </span>
              </Row>
            )}
          </ModalBody>
        </Modal>

        <UncontrolledTooltip
          placement="top"
          target={`main-comment-${this.props.cid}`}
        >
          ???????? ????????
        </UncontrolledTooltip>

        <UncontrolledTooltip
          placement="top"
          target={`remove-comment-${this.props.cid}`}
        >
          ?????? ????????
        </UncontrolledTooltip>
      </div>
    );
  }
}

export default Comment;
