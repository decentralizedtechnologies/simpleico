import { Theme, Typography, withStyles } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DropzoneJS, { DropzoneFile } from "dropzone";
import "dropzone/dist/basic.css";
import "dropzone/dist/dropzone.css";
import React from "react";

export interface IDropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  classes?: any;
  onAddFile: (file: DropzoneFile) => void;
}

export const Dropzone = withStyles((theme: Theme) => ({
  root: {
    borderColor: theme.palette.primary.light,
    fontFamily: theme.typography.fontFamily,
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: 63,
    "& .dz-message": {
      color: theme.palette.primary.main,
      margin: 0,
    },
  },
}))(({ classes, onAddFile, ...props }: IDropzoneProps) => {
  const [message, setMessage] = React.useState(<Typography>Upload keystore file</Typography>);

  React.useEffect(() => {
    DropzoneJS.autoDiscover = false;
    const dropzone = new DropzoneJS("#dropzone", {
      url: "/",
      autoProcessQueue: false,
      createImageThumbnails: false,
      uploadMultiple: false,
      previewsContainer: false,
      acceptedFiles: "text/plain",
    });
    dropzone.on("addedfile", (file: DropzoneFile) => {
      onAddFile(file);
      setMessage(
        <Typography>
          Upload keystore file <CheckCircleOutlineIcon fontSize="small" />
        </Typography>,
      );
    });
  }, []);

  return (
    <section id="dropzone" className={`dropzone ${classes.root}`} {...props}>
      <div className="dz-message" data-dz-message>
        {message}
      </div>
    </section>
  );
});
