import { CircularProgress } from "material-ui";
import * as React from "react";
import Content from "./Content";

interface Props {
    style: Object | undefined;
}

const Loading = ({ style } : Props) => {
    style = {...{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }, style};
    return <Content><CircularProgress
        mode="indeterminate"
        style={style}/>
    </Content>;
};

export default Loading;