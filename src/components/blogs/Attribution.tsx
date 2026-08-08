import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, memo } from "react";
import { NotebookHeading } from "@/components/NotebookHeading";
import { NotebookHeadingHighlight } from "@/components/NotebookHeadingHighlight";

export const Attribution: FC = memo(() => {
  return (
    <Stack spacing={1.5}>
      <NotebookHeading variant="h5" component="h2">
        <NotebookHeadingHighlight>ข้อมูลเว็ปไซต์</NotebookHeadingHighlight>
      </NotebookHeading>
      <Typography>
        {`เว็ปไซต์จัดทำให้เป็นสื่อการสอนกลุ่มสาระการรู้เรียนคณิตศาสตร์ โรงเรียนอยุธยาวิทยาลัย`}
      </Typography>
      <Typography sx={{ fontWeigth: 700 }}>{`พัฒนาและปรับปรุงโดย`}</Typography>
      <Stack>
        <Typography>{`คุณครูชุติมา ประภัสสรพิทยา และ`}</Typography>
        <Typography>{`นายธนกร พุทธรักษา`}</Typography>
      </Stack>
      <Typography>{`(แก้ไขครั้งล่าสุดเมื่อ: 19 มิถุนายน พ.ศ. 2568)`}</Typography>
    </Stack>
  );
});
