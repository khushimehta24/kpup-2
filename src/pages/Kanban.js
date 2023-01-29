import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import ScheduleService from "../services/ScheduleService"
import '../Body.css'
import { kpupContext } from "../context";

const board = {
    columns: [
        {
            id: 1,
            title: "Restock",
            cards: []
        },
        {
            id: 2,
            title: "Dispatch",
            cards: []
        },
        {
            id: 3,
            title: "Done",
            cards: []
        },
    ]
};




function UncontrolledBoard() {
    const { token } = useContext(kpupContext)
    useEffect(() => {
        ScheduleService.postSchedule(board, token)
            .then((res) => {
                console.log(res);
            })
    },)

    return (
        <Board
            allowRemoveLane
            allowRenameColumn
            allowRemoveCard
            allowAddColumn
            style={{ "& .react-kanban-column": { borderRadius: '50% !important' } }}
            onLaneRemove={console.log}
            onCardDragEnd={console.log}
            onCardRemove={console.log}
            onLaneRename={console.log}
            initialBoard={board}
            allowAddCard={{ on: "bottom" }}
            onNewCardConfirm={draftCard => ({
                id: new Date().getTime(),
                ...draftCard
            })}
            onCardNew={console.log}
        />
    );
}

function Kanban() {
    return (
        <>
            <UncontrolledBoard />
        </>
    );
}

export default Kanban
