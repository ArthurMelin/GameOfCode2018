from PyQt5.QtChart      import QChart, QChartView, QLineSeries, QSplineSeries
from PyQt5.QtGui        import QPolygonF, QPainter, QColor
from PyQt5.QtCore       import QPointF
from PyQt5.QtWidgets    import QMainWindow, QWidget, QGridLayout

import numpy            as np

class GraphWrapper(QWidget):
    def __init__(self, parent=None):
        super(GraphWrapper, self).__init__(parent=parent)
        self.curves = []
        self.chart = QChart()
        self.chart.legend().hide()
        self.chart.setBackgroundBrush(QColor(160, 137, 149))
        self.chart.setPlotAreaBackgroundBrush(QColor(190, 190, 190))
        self.chart.setPlotAreaBackgroundVisible(True)
        self.layout = QGridLayout(self);
        self.view = QChartView(self.chart, self)
        self.layout.addWidget(self.view, 0, 0)
        self.view.setRenderHint(QPainter.Antialiasing)

    def set_title(self, title):
        self.chart.setTitle(title)

    def add_curve(self, points, color=None):
        curve = QSplineSeries()
        pen = curve.pen()
        if color is not None:
            pen.setColor(color)
        pen.setWidthF(1)
        curve.setPen(pen)
        curve.setUseOpenGL(True)
        for point in points:
            x, y = (point)
            curve.append(x, y)
        self.curves.append(curve)
        self.chart.addSeries(curve)
        self.chart.createDefaultAxes()

    def add_points_to_curve(self, points, curve):
        self.chart.removeSeries(self.curves[curve])
        for point in points:
            x, y = (point)
            self.curves[curve].append(x, y)
        self.chart.addSeries(self.curves[curve])
        self.chart.createDefaultAxes()


if __name__ == '__main__':
    import sys
    from PyQt5.QtWidgets import QApplication
    from PyQt5.QtCore import Qt
    app = QApplication(sys.argv)

    window = QMainWindow()
    graph = GraphWrapper(window)
    window.setCentralWidget(graph)
    graph.add_curve([(1, 1), (2, 2)], color=Qt.red)
    graph.add_curve([(1, 2), (2, 1)], color=Qt.blue)
    graph.add_points_to_curve([(3, 3)], 0)
    graph.set_title("Bitcoin Price Prediction")
    window.setWindowTitle("Game of Code 2018")
    window.resize(850, 450)
    window.show()
    graph.show()

    sys.exit(app.exec_())
