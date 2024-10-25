module com.example.cinema {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.sql;


    opens com.example.cinema to javafx.fxml;
    exports com.example.cinema;
}