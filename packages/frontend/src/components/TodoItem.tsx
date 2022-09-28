import React from "react";

export default function TodoItem(props: {id: string | undefined}) {
    return (<h1>`Todo Item {props.id}`</h1>)
}