import React, { useState } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import '../Body.css'

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
    return (
        <Board
            allowRemoveLane
            allowRenameColumn
            allowRemoveCard
            allowAddColumn
            style={{ "& .react-kanban-column": { borderRadius: '50% !important' } }}
            onLaneRemove={console.log}
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
