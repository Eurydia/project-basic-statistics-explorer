import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, memo } from "react";
import { notebookHeadingSx } from "@/theme";

export const Attribution: FC = memo(() => {
  return (
    <Stack spacing={1.5}>
      <Typography variant="h5" component="h2" sx={notebookHeadingSx}>
        <Typography component="span" variant="inherit">
          {`ข้อมูลเว็ปไซต์`}
        </Typography>
      </Typography>
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
