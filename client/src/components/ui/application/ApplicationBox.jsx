import {
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { format } from 'date-fns';

const ApplicationBox = ({ item, showEdit }) => {
  return (
    <Card
      key={item.id}
      elevation={3}
      className="p-4 text-center md:p-8 auto-rows-auto auto-cols-auto"
    >
      <CardContent>
        <Typography variant="h4">{item?.name}</Typography>
        <Typography variant="body2">
          {item?.description?.length > 160
            ? item.description.slice(0, 160) + '...'
            : item.description}
        </Typography>
        <div className="mt-2 md:mt-4 flex flex-row items-center justify-center gap-2">
          <CalendarMonthIcon fontSize="medium" />
          <Typography variant="body2" fontWeight="bold">
            {format(new Date(Date.parse(item.startDate)), 'MM/dd/yyyy') +
              ' - ' +
              format(new Date(Date.parse(item.deadlineDate)), 'MM/dd/yyyy')}
          </Typography>
        </div>
      </CardContent>
      <CardActions className="p-2 gap-2 flex flex-col items-center justify-center">
        <Button variant="contained" color="primary">
          <Link to={`/applications/${item.slug}`}>Apply</Link>
        </Button>

        {showEdit && (
          <Button variant="contained" color="success">
            <Link to={`/applications/edit/${item.id}`}>Edit</Link>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ApplicationBox;
