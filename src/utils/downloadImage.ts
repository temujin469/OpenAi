import FileSaver from "file-saver";

export default async function downloadImage(_id: any, photo: string) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
